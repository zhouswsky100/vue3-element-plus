import { App} from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
const { getUserInfo } = useLayoutStore()


export default (app:App<Element>):void => {
    app.directive('permission', {
        updated(el, binding) {
            let className = el.getAttribute("class") || '';
            if (!hasPermission(binding.value)) {
                className = className.concat(" hidden");
            } else {
                className = className.replace("hidden", "");
            }
            el.setAttribute("class", className);
        },
        mounted(el, binding) {
           // 如果没有权限就移除此节点
          let className = el.getAttribute("class") || '';
          if (!hasPermission(binding.value)) {
              className = className.concat(" hidden");
          } else {
              className = className.replace("hidden", "");
          }
          el.setAttribute("class", className);
        },
        
    })
}

//判断是否有按钮权限
const hasPermission = (value:string) => {
    let item = getUserInfo.buttonMenus.find(x => x == value);
    return !!item;
};

