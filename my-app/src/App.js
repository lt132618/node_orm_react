import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import closeImg from './images/close.jpg'

class App extends Component {
  constructor({history}){
    super()
    this.history = history;
    this.state = {
      arr:[],
      newArr:[],
      title:'',
      path:'',
      newUrl:'',
      alt:''
    }
    
  }
  render() {
    var list = this.state.arr.map((title,index)=>{
      return <li key={index}  onClick={this.active.bind(this,index)}><span>{title.name}</span><span className="close"><img src={closeImg} alt="hhe" onClick={this.delete.bind(this,title.id)}/></span></li>  
          
    });
    return (
      <div className="App">
        <ul className="left">
          {list}
        </ul>
        <div className="right">
         {/*<img src={this.state.newUrl} alt={this.state.alt}/>*/}
         <p>{this.state.newUrl}</p>
        </div>
        <div>
          <input type="text" placeholder="请输入标题" ref='title' className="linkText" onChange={this.getTitle.bind(this)} id="title" />
          <input type="text" placeholder="请输入链接" ref='text' className="linkText" onChange=  {this.getText.bind(this)} id="title"/>
          <button className="btn" onClick={this.sendData.bind(this)}>点击添加</button>
          <ul>
            <li>http://img3.duitang.com/uploads/item/201505/30/20150530194525_mjiAv.thumb.700_0.jpeg</li>
            <li>http://img3.duitang.com/uploads/item/201503/27/20150327140703_BRZeu.jpeg</li> 
          </ul>
        </div>
        
      </div>
    );
  }
  active(index){ 
    this.setState({newUrl:this.state.arr[index].imgUrl,alt:this.state.arr[index].title},()=>{
      //console.log(this.state.arr[index].imgUrl+this.state.arr[index].id)
    }) 
  }
  getTitle(){
    var title = this.refs.title.value;
    this.setState({title:title},()=>{
    })
  }
  getText(){
    var path = this.refs.text.value;
    this.setState({path:path})
  }
  componentWillMount() {
    this.getData();
  }
  getData(){
    axios.get('http://10.51.39.118:3002/api/v1/getList').then((res)=>{
      //console.log(res)
      this.setState({arr:res.data}) 
    }).catch((err)=>{
      console.log(err)
    })
  }
  sendData(){
    var obj = {title:this.state.title,path:this.state.path};
    this.refs.title.value = '';
    this.refs.text.value = '';
    this.state.newArr.push(obj)
    this.setState({arr:this.state.newArr},()=>{
      axios.post('http://10.51.39.118:3002/api/v1/add',{
       "name":this.state.title,
       "imgUrl":this.state.path

      }).then((res)=>{
            var _this = this
             _this.getData()
      }).catch((err)=>{
           console.log(err.status);
      })
    }) 
  }
  delete(id){
    axios.post('http://10.51.39.118:3002/api/v1/delete',{
       index:id
      }).then((res)=>{
          //console.log(res)
          var _this = this
          _this.getData()
      }).catch((err)=>{
           console.log(err.status);
      })
  }
}

export default App;
