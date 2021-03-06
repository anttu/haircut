#!/bin/sh
set -o errexit -o nounset -o pipefail

npm test -- --watchAll=false
npm run build

AWS_PROFILE=anttu aws s3 cp build s3://haircut.afx.fi --recursive