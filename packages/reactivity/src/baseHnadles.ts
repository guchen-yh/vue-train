import { track } from './effect';
import { ReactiveFlags } from './reactive';

export const mutableHnadlers = {
    get(target, key, receiver) {
        // 用户取值操作
        if (ReactiveFlags.IS_REACTIVE == key) {
            return true;
        }
        track(target, key);
        return Reflect.get(target, key, receiver); // 处理this问题
    },
    set(target, key, value, receiver) {
        // 用户赋值的操作
        return Reflect.set(target, key, value, receiver);
    }

}