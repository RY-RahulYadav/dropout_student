import React, { useState } from 'react';
import "../styles/login.css";
import "../styles/footer.css";
import Header from './child_component/header';
import Footer from './child_component/footer';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    localStorage.clear()
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/${userType}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem('type' , userType)
        localStorage.setItem('uid', data.uid);
        alert('Login successful!');
        // alert('/'+localStorage.getItem('type'))
        // navigate('/'+localStorage.getItem('type'))
        navigate('/')
        window.location.reload()
      } else {
        alert(data.errors || 'Login failed. Please try again.');
      }
    } catch (err) {
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div><Header/></div>
      <hr />
      <div className='loginbox'>
      <section className="jCHKuJ3G7rklx_LiAfbf zlFmyfujKXCLCPyPEOIS" style={{ marginTop: "0rem" }}>
        <div className="i0EfZzmTLElZVOble53D HV01LldvyEqRHHy0hljF veFXkDzfJN473U3ycrV8 OmM4wtdsNjVR2r7OSzsm RV8RoaI_SlEMC5CEQ3ms S6lqcOV36w1qYVhB_gJM jj0BrgkBpq72EXwWuBh5 _kUFAjExH_qwNelRHnuR">
          <div className="Gv_Kzhl5FMSJkGOJVPkG zJEHSVu7alSVJ7kUYcCf J5z_xpzAk7ofGkPjWqvM">
            <img
              src="illustration.svg"
              alt="illustration"
              className="j2x7_17hqRVmwte_tWFa RV8RoaI_SlEMC5CEQ3ms s39ClfdnICIuO9QZ5YG_"
            />
          </div>
          <div className="jCISvWkW5oStPH6Wrb_H rhHZLKCNkg6rp7jwfB1J RV8RoaI_SlEMC5CEQ3ms yjGyQxv8jnYk9_MGMqLN _Qk4_E9_iLqcHsRZZ4ge lhxYQ_2y3sYNN3W1V_3q _cpMMPjFQqjJu4i0Puod nJQS7QrxrGJ4C_YwVwVY J5z_xpzAk7ofGkPjWqvM Vxu5gt71Zexz5PXSkXLX">
            <a href="#" className="ay0ziTPUL4Ag5d1DkSY7 neyUwteEn7DOg9pBSJJE _9OKVeTXzfSwD_NYO6_G uyo8h_4Kh1IoUwm8bwJI LYMps1kO2vF8HBymW3az g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">
              <img
                src="final_logo.png"
                alt="logo"
                className="_vZPglRSyqi4oTXg5L1_ _pwSRUXRHN5bHphyTRKz _gmxfZ2BpOHxa6nWwqBB"
                style={{ width: '4rem', height: '3rem' }}
              /> Flow Education
            </a>
            <h1 className="rD4HtsUG_hahmbh2Kj09 _e063bssp_1bldcJ6kR0 _WfIfkoGCi0vvUrnNs4M jGqC6Vyq4r7i62RWVQU_ marR_sCaF_d1KewmkXGX g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0" style={{ margin: '1rem 0' }}>
              Log In
            </h1>
            
            <p className="MxG1ClE4KPrIvlL5_Q5x XdjN1uxS_rsa3F90ox40 K1PPCJwslha8GUIvV_Cr _Rz9TooiK_4jTN_Ub8Gm" style={{ margin: '1rem 0' }}>
              Start your website in seconds. Don't have an account?{' '}
              <a href="/signup" className="_A6LflweZRUwrcL6M2Tk text-primary-600 _5zvlMLkN1qETxEl3IhT dark:text-primary-500">
                Signup here
              </a>.
            </p>
            <form onSubmit={handleSubmit} noValidate className="KgBTWt39fdiAC__YVNt8 xXHjLQ2J7cbu8iHm8NVp AuB0Ecr_8CO7ghWxxqa1 ng-untouched ng-pristine ng-invalid">
              <div className="lSg6RHKCkPBz2kSnADor hAFtnIdYDiO6M_67F11P">
                <div >
                  <label htmlFor="email" className=" ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0" style={{ margin: '1.2rem 0' }}>
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                       className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
                    style={{ height: '3rem', width:"32rem" }}
                  />
                </div>
                <div >
                  <label htmlFor="password" className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0" style={{ margin: '1.2rem 0' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                       className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
                    style={{ height: '3rem' }}
                  />
                </div>
                <div style={{marginTop:"2rem"}} className="jCHKuJ3G7rklx_LiAfbf PwY_VWJs3K9KHLKi48qA">
                <label htmlFor="userType" className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0 bg-white">User Type</label>
                <select  id="userType" name="userType" value={userType} onChange={(e) => setUserType(e.target.value)} required
                  className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj">
                
                  <option value="">Select user type</option>
                    <option value="govt">Govt</option>
                    <option value="college">College</option>
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                </select>
              </div>
               
              <button type="submit" style={{marginTop:"2rem"}}
                    class="jCISvWkW5oStPH6Wrb_H wP9HMsqy6b96l2HBRbgb bg-primary-600 hover:bg-primary-700 _FONMPVaCsLFJJGDaaIL qHIOIw8TObHgD3VvKa5x focus:ring-primary-300 _A6LflweZRUwrcL6M2Tk _Qk4_E9_iLqcHsRZZ4ge MxG1ClE4KPrIvlL5_Q5x bFARDnno0HUtfhktTXfR _gKcj49wZgnwx1LpcJi6 _F_1gdhzusC6tSOWHtx_ dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </section></div>
      <div className="footer"><Footer/></div>
    </>
  );
};

export default Login;
