#!/bin/bash
NODE_ENV=development

tsc -p build/tsconfig.es.json -w
