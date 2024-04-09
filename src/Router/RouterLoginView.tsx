import {Alert, Button, Input, Space, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {ChangeEvent, useEffect, useState} from "react";
import {AuthService} from "../Firebase/AuthService";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../Redux/store";
import {Route, useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";


function RouterLoginView() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const auth = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()

  useEffect(() => {
    if (auth.isLogin) {
      navigate('/')
    }
  }, [auth]);

  function onClick() {
    setLoading(true)


    // AuthService.shared.login(username, password)
    //   .then((credential) => {
    //     setLoading(false)
    //   })
    //   .catch(e => {
    //     console.log(e)
    //     setLoading(false)
    //   })
  }

  function onUserNameChanged(e: ChangeEvent) {
    let userName = (e.target as any).value
    setUserName(userName)
  }

  function onPasswordChanged(e: ChangeEvent) {
    let password = (e.target as any).value
    setPassword(password)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'lightgray',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
    }}
    >

      <Space direction={'vertical'}
             style={{width: '500px', maxWidth: '75%', backgroundColor: 'white', borderRadius: '10px', padding: '30px'}}
      >
        <Typography.Text style={{fontWeight: 'bold', fontSize: '32px'}}>Đăng nhập</Typography.Text>
        <Typography.Text>Tên đăng nhập</Typography.Text>
        <Input
          style={{height: '40px'}}
          onChange={onUserNameChanged}
          placeholder="Tên đăng nhập"

          prefix={<UserOutlined className="site-form-item-icon"/>}
        />
        <div style={{height: '10px'}}/>
        <Typography.Text>Mật khẩu</Typography.Text>

        <Input
          style={{height: '40px'}}
          placeholder="Mật khẩu"
          onChange={onPasswordChanged}
          prefix={<LockOutlined className="site-form-item-icon"/>}
        />
        <br/>
        <Button type={'primary'}
                style={{width: '100%', height: '40px'}}
                loading={loading}
                onClick={onClick}
        >
          Đăng nhập thất bại
        </Button>
      </Space>

    </div>
  );
}

export default RouterLoginView;