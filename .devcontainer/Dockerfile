FROM mcr.microsoft.com/devcontainers/python:3.11-bookworm

# Install Node.js 20 via NodeSource (using the new GPG key method,
# since the legacy setup_XX.x scripts are deprecated and broken on many distros)
ARG NODE_VERSION=20
RUN mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
       | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_VERSION}.x nodistro main" \
       > /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && node --version && npm --version
