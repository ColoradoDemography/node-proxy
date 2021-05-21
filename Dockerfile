FROM mhart/alpine-node:16

ADD . .

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

# If you need npm, don't use a base tag
RUN apk add --update bash && npm install

EXPOSE 443 80

CMD ["node", "index.js"]
