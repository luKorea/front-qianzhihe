/**
 * 格式化金钱
 * @param {*} num 
 * @returns 
 */
export function filtersFormatMoney(num) {
    var oldNum = num;
    num = Number(Number(num).toFixed(2));
    if (!isNaN(num)) {
        var c = (num.toString().indexOf('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        var str = c.split(".");
        if (str.length == 1) { c = c + '.00'; } else { if (str[1].length == 1) { c = c + '0'; } }
        return c;
    } else {
        return oldNum;
    }
}
/**
 * 格式化金钱--avue
 * @param {*} row 
 * @param {*} value 
 * @param {*} label 
 * @param {*} column 
 * @returns 
 */
export function formatterFiltersFormatMoney(row, value, label, column) {
    return filtersFormatMoney(label)
}


