FROM golang:1.19-alpine AS builder

RUN apk update && apk upgrade
RUN apk --no-cache --update add git

WORKDIR /app

COPY . .

RUN go build -o main cmd/main.go

RUN apk --no-cache add tzdata

FROM alpine:latest

RUN apk --no-cache add tzdata

COPY --from=builder /app/main .

CMD [ "/main" ]
