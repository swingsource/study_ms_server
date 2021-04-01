const utils = {
    /**
     * list => tree
     * @param oldArr
     * @returns {*}
     */
    listToTree: (oldArr) => {
        // 如果不含有一级目录 则排序后返回
        let allLevel2 = true
        oldArr.forEach(item => {
            if (item.parentId + '' === '0') {
                allLevel2 = false
            }
        })
        if (allLevel2) {
            oldArr.sort((a, b) => {
                return a.sortIndex - b.sortIndex
            })
            return oldArr
        }
        // 含有一级目录，to tree
        oldArr.forEach(element => {
            let parentId = element.parentId;
            if(parentId !== 0){
                oldArr.forEach(ele => {
                    if(ele.id === parentId){ //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
                        if(!ele.children){
                            ele.children = [];
                        }
                        ele.children.push(element);
                        // 排序
                        ele.children.sort((a, b) => {
                            return a.sortIndex - b.sortIndex
                        })
                        // ele.hasChildren = true
                    }
                });
            }
        });
        oldArr = oldArr.filter(ele => ele.parentId === 0); //这一步是过滤，按树展开，将多余的数组剔除；
        // 排序
        oldArr.sort((a, b) => {
            return a.sortIndex - b.sortIndex
        })
        return oldArr
    }
}

module.exports = utils
