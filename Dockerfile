FROM rust:1.83-slim AS builder

RUN apt-get update && apt-get install -y \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build
COPY . .
RUN cargo build --release -p selin

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libssl3 \
    sqlite3 \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /build/target/release/selin /app/selin
COPY templates/ /app/templates/

# Default environment — override at runtime.
ENV MODEL_ENDPOINT=http://local-llm:11434
ENV ADCCL_THRESHOLD=0.7071
# The CLI persists identity + the myelin store under $HOME/.selin. Point HOME at
# the mounted data volume so state survives container restarts. (SELIN_DATA_DIR
# was set here but never read by the code — removed.)
ENV HOME=/data/selin

RUN mkdir -p /data/selin

EXPOSE 8080

# Liveness: the server answers GET /health once it's up.
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=5 \
    CMD curl -fsS http://localhost:8080/health || exit 1

ENTRYPOINT ["/app/selin"]
# Run the long-running HTTP governance server (was `preflight`, which ran once
# and exited — the container then crash-looped under restart: on-failure).
CMD ["serve", "--port", "8080"]
