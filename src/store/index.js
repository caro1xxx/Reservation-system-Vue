import { createStore } from 'vuex'

export default createStore({
  state: {
    nowdate:'',
    nowpage:1,
    date:'',
    next:'',
    msg:'',
    tokenstate:false,
    liststate:false,
    num:0,
    bodystate:false,
    bodymsg:'',
    bodymsgnum:0,
    urlname:'',
    url:'',
  },
  mutations: {
    AddNowDate(state,date){
      state.nowdate = date;
    },
    IncreasePage(state){
      state.nowpage+=1;
    },
    ReducePage(state){
      state.nowpage-=1;
    },
    ChangeDate(state,date){
      state.date = date;
    },
    CheckPage(state,data){
      state.next = data;
    },
    ChangeTipState(state,msg){
      state.msg = msg;
    },
    ChangeTokenState(state,name){
      state.tokenstate = !state.tokenstate;
    },
    Changeliststate(state){
      state.liststate = !state.liststate;
    },
    SetDetailsNum(state,id){
      state.num = id;
    },
    SetbodyState(state,msg){
      state.bodystate = !state.bodystate;
      state.bodymsg = msg;
      state.bodymsgnum ++;
    },
    SetUrlName(state,url){
      state.urlname = url;
    },
    SetUrl(state,url){
      state.url = url;
    },
  },
  actions: {
  },
  modules: {
  }
})
