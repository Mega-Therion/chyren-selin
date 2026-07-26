FROM rust:1.79-slim AS builder

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
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /build/target/release/selin /app/selin
COPY templates/ /app/templates/

# Default environment — override at runtime
ENV MODEL_ENDPOINT=http://local-llm:11434
ENV ADCCL_THRESHOLD=0.7071
ENV SELIN_DATA_DIR=/data/selin

RUN mkdir -p /data/selin

EXPOSE 8080

ENTRYPOINT ["/app/selin"]
CMD ["preflight"]
