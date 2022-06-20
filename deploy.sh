#!/bin/sh

npm run build

AWS_PROFILE=anttu aws s3 cp build s3://haircut.afx.fi --recursive