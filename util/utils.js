const utils = {
    /**
     * list => tree
     * @param oldArr
     * @returns {*}
     */
    listToTree: (oldArr) => {
        oldArr.forEach(element => {
            let parentId = element.parentId;
            if(parentId !== 0){
                oldArr.forEach(ele => {
                    if(ele.id === parentId){ //当内层循环的ID== 外层循环的parendId时，（说明有children），需要往该内层id里建个children并push对应的数组；
                        if(!ele.children){
                            ele.children = [];
                        }
                        ele.children.push(element);
                    }
                });
            }
        });
        oldArr = oldArr.filter(ele => ele.parentId === 0); //这一步是过滤，按树展开，将多余的数组剔除；
        return oldArr;
    }
}

module.exports = utils
