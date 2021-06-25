#!/bin/bash
baseball=$(
  cd $(dirname $0) || exit
  pwd
)
cd "$baseball" || exit
#pnpm run build
git add .
remark=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "zzf 费控系统 ${remark}"
git pull origin dev
git push origin dev
