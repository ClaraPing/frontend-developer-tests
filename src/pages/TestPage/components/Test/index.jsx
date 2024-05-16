/** 统计对账 列表页 **/
import * as React from 'react';
import { Box, Card, Table, Form, Select, Button } from '@alifd/next';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import util from '@/utils/util';
import TestApi from '@/api/TestApi';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    fixedSpan: 8
  },
  wrapperCol: {
    span: 10
  }
};

const Test = (props) => {
  const [ dataList, setDataList ] = useState([]);
  const [ list, setList ] = useState([]);
  const [ locationArr, setLocationArr ] = useState([]);
  const genderArr = ['female','male']
  const [dataForm, setDataForm] = useState({
    country: '',
    gender: ''
  })

  useEffect(()=>{
    initData();
  },[])

  function initData(){
    const params = {
      results: 100
    };

    TestApi.getTestData(params).then(async res => {
      if(res){
        const resData = res.results;

        /** 去重，求国家数组 **/
        await resData.forEach((item)=>{
          if(!locationArr.includes(item.location.country)){
            locationArr.push(item.location.country)
          }
        })

        setLocationArr(locationArr)
        setDataList(resData);
        setList(resData)
      }
    })
  }


  function handleChangeCondition(value,item){
    if(item.name == 'country'){
      dataForm.country = value.country
    }else{
      dataForm.gender = value.gender
    }

    console.log('dataForm::', dataForm)

    setDataForm(dataForm)

  }


  const linkName = (value) => {
    return <Button type="primary" text>{value.title}.{value.first}{value.last}</Button>
  }


  const linkDate = (value) => {
    return <span>{util.getFullTime(value)}</span>
  }

  async function handleSearch(){
    let arr = [];
    let arrData = list;
    if(dataForm.country && dataForm.gender){
      arrData.forEach((sItem) =>{
        if(sItem.location.country == dataForm.country &&
          sItem.gender == dataForm.gender){
          arr.push(sItem)
        }
      })
    }else if(!dataForm.country && !!(dataForm.gender.toString())){
      arrData.forEach((sItem) =>{
        if(sItem.gender == dataForm.gender){
          arr.push(sItem)
        }
      })
    }else{
      arrData.forEach((sItem) =>{
        if(sItem.location.country == dataForm.country){
          arr.push(sItem)
        }
      })
    }


    /** 按照时间倒序 **/
    const sortData = arr.sort((a, b) => {
      return new Date(b.registered.date) - new Date(a.registered.date)
    });

    setDataList(sortData);
  }


  let flag = false;

  function handleReset(){
    if(!flag && (!!dataForm.country || !!dataForm.gender)){
      flag = true;
      setTimeout(() => {
        setDataForm({
          country: undefined,
          gender: undefined
        })
        initData();
      }, 500);

      flag = false;
    }


  }

  return (
    <div>
      <Box spacing={20}>
        <Card free>
          <Card.Content>
            <Form style={formItemLayout}
                  inline
                  colon={true}
                  onChange={handleChangeCondition}
                  value={dataForm}>
              <FormItem
                name="country"
                label="country">
                <Select defaultValue={dataForm.country}>
                  {
                    locationArr.length && locationArr?.map((statusItem,statusIndex)=>{
                      return (<Select.Option key={statusIndex}
                                             value={statusItem}
                                             placeholder="请选择">{statusItem}</Select.Option>)
                    })
                  }
                </Select>
              </FormItem>

              <FormItem
                name="gender"
                label="gender">
                <Select defaultValue={setDataForm.gender}>
                  {
                    genderArr?.map((gItem,gIndex)=>{
                      return (<Select.Option key={gIndex}
                                             value={gItem}
                                             placeholder="请选择">{gItem}</Select.Option>)
                    })
                  }
                </Select>
              </FormItem>

            </Form>
            <Box spacing={10} direction="row">
              <Button type="primary" onClick={ handleSearch }>搜索</Button>
              <Button type="normal" onClick={ handleReset }>重置</Button>
            </Box>
          </Card.Content>
          <Card.Content>
            <div className={styles.content}>
              <Table dataSource={ dataList } hasBorder={false} className={styles.mainTable}>
                <Table.Column title="Name" dataIndex='name' cell={ linkName }/>
                <Table.Column title="Gender" dataIndex="gender" />
                <Table.Column title="Country" dataIndex="location.country" />
                <Table.Column title="City" dataIndex="location.city" />
                <Table.Column title="State" dataIndex="location.state" />
                <Table.Column title="Date Registered" dataIndex="registered.date"  cell={ linkDate}/>
              </Table>
            </div>
          </Card.Content>
        </Card>
      </Box>
    </div>
  );
};

export default Test;
