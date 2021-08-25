FROM node:14-alpine AS builder

ARG AUTH_ROLE_ADMIN
ARG AUTH_ROLE_EMPLOYEE
# Install dependencies.
RUN apk update && \
  apk add --no-cache \
    --virtual build-dependencies \
      build-base \
      gcc \
      wget \
      git

# Create unprivileged account.
RUN adduser -D project

# Switch working directory.
WORKDIR /tmp/project

# Copy source code.
COPY . ./

# Install dependencies and build application.
RUN yarn install && yarn build

FROM nginx:1.18-alpine AS server

# Copy the built application to the new image.
COPY --from=builder /tmp/project/dist /usr/share/nginx/html

# Copy the NGINX configuration with proper location handling.
COPY nginx.conf /etc/nginx/conf.d/default.conf
