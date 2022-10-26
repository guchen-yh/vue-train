import { isObject } from '@vue/shared';
import { mutableHnadlers } from './baseHnadles';

export const enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive",
}

const reactiveMap = new WeakMap(); // key 只能是对象
export function reactive(target) {
    // 不对非对象的类型进行处理
    if (!isObject(target)) {
        return target;
    }
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target;
    }
    const exisitsProxy = reactiveMap.get(target);
    if(exisitsProxy){
        return exisitsProxy
    }

    // 代理 通过代理对象操作属性，会去源对象上进行获取
    const proxy = new Proxy(target, mutableHnadlers);
    // 缓存一下，代理过得对象，下次进行代理的时候直接拿出来用即可
    // target -> proxy
    reactiveMap.set(target, proxy);
    return proxy;
}