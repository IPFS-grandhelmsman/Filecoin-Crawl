import network from './network';

// pictureList 图片
export function picture(data) {
  return network({
    url: `/login`,
    method: "post",
    data
  });
}

// tt03176 list  getid?start=10&pagesize=2
export function CIDList(data) {
  return network({
    url: `/getid`,
    method: "get",
    params:data
  })
}

