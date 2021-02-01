FROM node:10-alpine

# Set environment variables.
ENV NODE_ENV production
ENV DEBUG app:info,app:warn,app:error

# Install dependencies.
RUN apk update && \
  apk add --no-cache \
    --virtual build-dependencies \
      build-base \
      gcc \
      git \
      wget

# Create unprivileged account.
RUN adduser -D project

# Switch working directory.
WORKDIR /home/project

# Copy source code.
COPY app/ ./app
COPY package.json yarn.lock config.js knexfile.js .babelrc ./

# Set file permissions.
RUN chown -R project:project .

# Switch user.
USER project

# Install dependencies.
# Development dependencies will not be installed
# because NODE_ENV is set to production.
RUN yarn install

# Expose application port.
EXPOSE 3000

# Set start-up command.
CMD ["yarn", "start"]
