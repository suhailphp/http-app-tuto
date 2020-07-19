import _ from "lodash";
export default function paginate(items, pageNumber, pageSize) {
  let startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
