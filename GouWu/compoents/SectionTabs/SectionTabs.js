// compoents/SectionTabs/SectionTabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //传递的数组
    sectionTabList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击section
    clickSectionButton(e){
      //console.log(e);
      //点击的索引
      const itemid = e.currentTarget.dataset.itemid;

      //数据传递到父控件， （方法名，数据）
      this.triggerEvent("clickSection", itemid);
    }
  }
})
