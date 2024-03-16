import {Button, Card, Col, Divider, Flex, Grid, Layout, Row, Typography} from "antd";
import {Content} from "antd/es/layout/layout";
import Meta from "antd/es/card/Meta";
import {useSelector} from "react-redux";
import {RootState} from "../Redux/store";
import {Utils} from "../Utils/Utils";



function MenuView() {

  const items = useSelector((state: RootState) => state.items);

  return <Content style={{ paddingLeft: '8%', paddingRight: '8%', paddingTop: '50px', paddingBottom: '50px', backgroundColor: 'white' }}>
      <Flex wrap="wrap" gap="large">
        {
          items.map(item => (
            <Card
              hoverable
              styles={{
                body: {
                  paddingTop: '10px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  paddingBottom: '20px'
                }
              }}
              style={{
                width: '18%', marginBottom: '20px', minWidth: '150px'
            }}
              cover={<img alt="No Image" src={item.image} />}
            >
              {/*<Meta title={*/}
              {/*  <Typography.Text style={{wordWrap: 'break-word'}} >{item.name}</Typography.Text>*/}
              {/*}*/}
              {/*      description= { Utils.shared.vndFormat(item.price) } />*/}
              <Typography.Text
                style={{
                  fontWeight: 'bold',
                  fontSize: '17px',

              }}>
                { item.name}
              </Typography.Text>

              <div style={{ height: '40px' }}/>

              <Typography.Text
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '10px',
                  fontWeight: 'bold',
                  fontSize: '17px',
                  color: '#8b0000',
                  }}
              >
                {Utils.shared.vndFormat(item.price)}
              </Typography.Text>
            </Card>
        ))
        }
      </Flex>
    </Content>
}

export default MenuView;