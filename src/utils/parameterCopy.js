/**
 * 深拷贝主要是将另一个对象的属性值拷贝过来之后，另一个对象的属性值并不受到影响，因为此时它自己在堆中开辟了自己的内存区域，不受外界干扰。
 浅拷贝主要拷贝的是对象的引用值，当改变对象的值，另一个对象的值也会发生变化。
 */

//深拷贝
//1.JSON方法实现  JSON.parse(JSON.stringify(obj));
//2.用for…in实现遍历和复制
export function DeepClone(obj) {
    // 深度克隆，拷贝对象中所有属性，这样修改起来才不会污染原有的变量，这样才可以做这个不敢大意的是件
    let result = typeof obj.splice === "function" ? [] : {};
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                result[key] = DeepClone(obj[key]);//如果对象的属性值为object的时候，递归调用deepClone,即在吧某个值对象复制一份到新的对象的对应值中。
            } else {
                result[key] = obj[key];//如果对象的属性值不为object的时候，直接复制参数对象的每一个键值到新的对象对应的键值对中。
            }

        }
        return result;
    }
    return obj;
}

//3.利用数组的Array.prototype.forEach进copy
export function ArrayDeepClone(obj) {
    let copy = Object.create(Object.getPrototypeOf(obj));
    let propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(function (items) {
        let item = Object.getOwnPropertyDescriptor(obj, items);
        Object.defineProperty(copy, items, item);

    });
    return copy;
};


//浅拷贝（使用object.assign方法）
//Object.assign(obj1,obj2);
