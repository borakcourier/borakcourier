import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { color } from 'react-native-reanimated';
import { Table, TableWrapper, Row, Rows, Cell, Col } from 'react-native-table-component';
import { Text, TouchableOpacity } from 'react-native-ui-lib';
import { colors } from '../styles';
import IconButton from './IconButton';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'],
      widthArr: [100, 100, 100, 100, 120, 140, 160, 180, 100, 100, 100, 100]
    }
  }

  
  render() {

    const {TableRight} = this.props

    const element = (data, index) => (
        <TouchableOpacity onPress={() => this._alertIndex(index)}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>button</Text>
          </View>
        </TouchableOpacity>
      );

    const convertedArray =  this.props.data.map(ele =>  Object.keys(ele).map((innerEle) => ele[innerEle]) )

    return (
        <ScrollView horizontal={true} >
            <ScrollView 
                stickyHeaderIndices={[0]}
            >
            <View>
                <View style={{flexDirection:'row'}} >
                    {this.props.tableHead.map((head, index) => 
                        <View style={styles.cellHead} >
                            <Text style={{color:colors.WHITE, textTransform:'uppercase'}} >{head}</Text>
                        </View>
                    )}
                </View>
            </View>
            
            {convertedArray.map((dataRow, index) => 
                <View key={index} style={{flexDirection:'row'}} >
                    {dataRow.map((cellData, cellIndex) => 
                        <View key={cellIndex} style={styles.cellBody} >
                            <Text style={{color:colors.FONT_COLOR}} >{cellData}</Text>
                        </View>
                    )}
                    <View style={[styles.cellBody, {flexDirection:'row'}]} >
                        <IconButton 
                            icon='search'
                            color={colors.PRIMARY}
                        />
                        <IconButton 
                            icon='edit'
                        />
                        <IconButton 
                            icon='trash'
                            color='red'
                        />
                        
                    </View>
                </View>
            )}

            </ScrollView>
        </ScrollView>
    )

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={this.props.tableHead} widthArr={this.props.widthArr} style={styles.head} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
                {
                  convertedArray.map((dataRow, index) => (
                      <>
                        <Row
                            key={index}
                            data={dataRow}
                            widthArr={this.props.widthArr}
                            style={[styles.row, index%2 && {backgroundColor: '#ffffff'}]}
                            textStyle={styles.text}
                        />
                        <Text>sdsd</Text>
                        {/* <TableWrapper>
                            {dataRow.map((cellData, cellIndex) => (
                                <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                            ))}
                        </TableWrapper> */}
                    </>
                  ))
                }

              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    paddingTop: 30, 
    backgroundColor: '#ffffff' 
  },
  head: { 
    height: 50, 
    backgroundColor: '#6F7BD9' 
  },
  text: { 
    textAlign: 'center', 
    color:colors.FONT_COLOR
    // fontWeight: '200' 
  },
  dataWrapper: { 
    marginTop: -1 
  },
  row: { 
    height: 40, 
    backgroundColor: '#F7F8FA' 
  },


  cellBody:{
      height:50, 
      width:100, 
      alignItems:'center', 
      justifyContent:'center', 
      backgroundColor:colors.WHITE,
      borderWidth:0.5,
      borderColor:colors.BORDER_COLOR
  },
  cellHead:{
    height:50, 
    width:100, 
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor:colors.BLACK
  }
});