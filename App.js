import React from 'react';
import { StyleSheet, Text, View ,ImageBackground,TextInput,Button,ScrollView,TouchableOpacity} from 'react-native';
import { Ionicons,Entypo } from '@expo/vector-icons';


export default class App extends React.Component {
  constructor()
  {
    super();
    this.state={
       caption:"",
       display:[],
       count:0
    };
    this.listarr=[];
    this.key=1;
  }
  add()
  {
    if(this.state.caption != "")
    {
      let obj={caption:this.state.caption,isComp:0};
      this.listarr.push(obj);
      this.setState({
        caption:""
      })
      this.setState({
        count:this.state.count+1
      })
      this.display()
    }
  }
  del(index)
  {
    if(this.listarr[index].isComp==0)
    {
      this.setState({
        count:this.state.count-1
      })
    }
    this.listarr.splice(index,1);
    this.display();
  }
  mark(index)
  {
    this.listarr[index].isComp=1;
    this.setState({
      count:this.state.count-1
    })
    this.display();
  }
  unmark(index)
  {
    this.listarr[index].isComp=0;
    this.setState({
      count:this.state.count+1
    })
    this.display();
  }
  clearcomp()
  {
    for(let i=0;i<this.listarr.length;i++)
   {
     if(this.listarr[i].isComp==1)
     {
      this.del(i)
      i--;
     }
   }
   this.display();
  }
  display()
  {
    this.setState({
      display:[]
    })
    let rows=[]
   for(let i=0;i<this.listarr.length;i++)
   {
     let text=[]
     let row=[]
     row.push(<View key={this.key++} style={styles.liText}>{text}</View>)
     let buttons=[]
     if(this.listarr[i].isComp==0){
      buttons.push(<TouchableOpacity key={this.key++} onPress={() => this.mark(i)}><Ionicons name="md-checkmark-circle" size={40} /></TouchableOpacity>)
      text.push(<TextInput key={this.key++} style={styles.litext} defaultValue={this.listarr[i].caption} onChangeText={text => this.listarr[i].caption=text}></TextInput>)
     }
     else{
      buttons.push(<TouchableOpacity key={this.key++}  onPress={() => this.unmark(i)}><Ionicons name="md-checkmark-circle" size={40} color="green" /></TouchableOpacity>)
      text.push(<TextInput key={this.key++} style={[styles.litext,styles.liTextLine]} defaultValue={this.listarr[i].caption} onChangeText={text => this.listarr[i].caption=text}></TextInput>)
     }
     buttons.push(<TouchableOpacity key={this.key++}  onPress={() => this.del(i)}><Entypo name="cross" size={40} /></TouchableOpacity>)
     row.push(<View key={this.key++} style={styles.btns}>{buttons}</View>)
     rows.push(<View key={this.key++} style={styles.li}>{row}</View>)
   }
   this.setState({
    display:rows,
  })
  }
  render() {
    return (
      <ImageBackground source={require('./assets/file-20180822-149484-cs44toreduced.jpg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <View style={styles.heading}>
           <Text style={styles.headingText}>todos</Text>
        </View>
        <View style={styles.listcontainer}>
            <View style={styles.newentry}>
              <View style={styles.cont1}>
              <TextInput style={styles.inputbox} placeholder="Whats new ??" value={this.state.caption} onChangeText={text => this.setState({caption:text})}></TextInput>
              </View>
              <View style={styles.cont2}>
              <TouchableOpacity onPress={_ => this.add()}><Text style={{color:'white',fontSize:20}}>Submit</Text></TouchableOpacity>
              </View>
            </View>
            <ScrollView style={styles.list}>
              {this.state.display}
            </ScrollView>
            <View style={styles.options}>
              <View style={styles.options1}>
                 <Text style={styles.options1Text}>{this.state.count} items left</Text>
              </View>
              <View style={styles.options2}>
                  <TouchableOpacity style={styles.options2btn} onPress={() => this.clearcomp()}><Text style={styles.options2Text}>Clear Completed</Text></TouchableOpacity>
              </View>
            </View>
        </View>
      </View>
       </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading:{
    flex:3,
    alignItems:'center',
    justifyContent: 'center',
  },
  headingText:{
    fontSize:80,
    color:'white'
  },
  listcontainer :{
    flex:7,
    marginLeft:40,
    marginRight:40,
    marginBottom:40,
    color:'white'
  },
  newentry:{
    alignItems:'stretch',
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    flexDirection:'row',
    marginBottom:10,
    color:'white',
    backgroundColor:'black',
  },
  inputbox:{
    padding:10,
    fontSize:30,
    color:'white'
  },
  cont1:{
     flex:7,
     color:'white'
  },
  cont2:{
     flex:3,
     alignItems:'center',
     justifyContent:'center'
  },
  li:{
    alignItems:'stretch',
    borderBottomWidth: 1,
    borderRadius: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    flexDirection:'row',
    marginBottom:10,
  },
  litext:{
    padding:10,
    fontSize:30,
    color:'white'
  },btns:{
    flex:3,
    alignItems:'center',
    marginRight:10,
    flexDirection:'row',
    justifyContent:'space-between',
    color:'white'
  },
  liText:{
    flex:7,
    color:'white'
  },
  liTextLine:{
    textDecorationLine:'line-through',
    color:'white'
  },
  options:{
    alignItems:'stretch',
    borderBottomWidth: 1,
    borderRadius: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    flexDirection:'row',
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
    color:'white'
  },
  options1:{
     justifyContent:'center',
     color:'white'
  },
  options1Text:{
    fontSize:25,
    color:'white',
    paddingBottom:10
  },
  displaynone:{
    display:'none',
  },
  options2Text:{
     fontSize:25,
     color:'white',
     paddingBottom:10,
  },
});
