FROM rust:1.83-slim AS builder

WORKDIR /build
COPY . .
RUN cargo build --release -p selin

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y \
    ca-certificates \
    sqlite3 \
    curl

WORKDIR /app
COPY --from=builder /build/target/release/selin /app/selin
COPY templates/ /app/templates/

# Default environment - override at runtime.
ENV MODEL_ENDPOINT=http://local-llm:11434
ENV ADCCL_THRESHOLD=0.7071
ENV HOME=/data/selin

RUN mkdir -p /data/selin

EXPOSE 8080

# Liveness: the server answers GET /health once it's up.
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=5 \
    CMD curl -fsS http://localhost:8080/health || exit 1

ENTRYPOINT ["/app/selin"]
CMD ["serve", "--port", "8080"]
