import React, { useState } from 'react';
import "../styles/register.css";
import Header from './child_component/header';
import Footer from './child_component/footer';
import {useNavigate} from 'react-router-dom'

const Register = (props) => {
  // State to manage form inputs
  const navigate = useNavigate();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name:"",
    email: '',
    GovtDepartment: '',
    helpline: '',
    password: '',
  });
  const [collegeData, setcollegeData] = useState({
    collegeId: '',
    name: '',
    department: '',
    email: '',
    password: '',
   
  });

  // State to manage userType separately
  const [userType, setUserType] = useState('govt');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userType') {
      setUserType(value);
    }
     else {
    if(userType=="govt"){
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));}
      else{
        const { name, value } = e.target;
       setcollegeData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    localStorage.clear()
    e.preventDefault();
    // console.log(userType , formData , `${import.meta.env.VITE_URL}/api/${userType}/register`);
    let data={};
    if(userType=="govt"){
        data=formData
    }else{
        data= collegeData
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/${userType}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('uid' , result.uid)
        localStorage.setItem('type' , userType)
        alert("Registration successful");
        navigate('/')
        window.location.reload()
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert('An error occurred while registering.');
    }
  };

  return (
    <>
      <Header  />
      <hr />
      <section style={{ marginTop: "0rem" }} className="jCHKuJ3G7rklx_LiAfbf zlFmyfujKXCLCPyPEOIS">
        <div className="i0EfZzmTLElZVOble53D HV01LldvyEqRHHy0hljF veFXkDzfJN473U3ycrV8 OmM4wtdsNjVR2r7OSzsm RV8RoaI_SlEMC5CEQ3ms S6lqcOV36w1qYVhB_gJM jj0BrgkBpq72EXwWuBh5 _kUFAjExH_qwNelRHnuR">
          <div className="Gv_Kzhl5FMSJkGOJVPkG zJEHSVu7alSVJ7kUYcCf J5z_xpzAk7ofGkPjWqvM">
            <img className="j2x7_17hqRVmwte_tWFa RV8RoaI_SlEMC5CEQ3ms s39ClfdnICIuO9QZ5YG_"
              src="illustration.svg"
              alt="illustration" />
          </div>
          <div className="jCISvWkW5oStPH6Wrb_H rhHZLKCNkg6rp7jwfB1J RV8RoaI_SlEMC5CEQ3ms yjGyQxv8jnYk9_MGMqLN _Qk4_E9_iLqcHsRZZ4ge lhxYQ_2y3sYNN3W1V_3q _cpMMPjFQqjJu4i0Puod nJQS7QrxrGJ4C_YwVwVY J5z_xpzAk7ofGkPjWqvM Vxu5gt71Zexz5PXSkXLX">
            <a className="ay0ziTPUL4Ag5d1DkSY7 neyUwteEn7DOg9pBSJJE _9OKVeTXzfSwD_NYO6_G uyo8h_4Kh1IoUwm8bwJI LYMps1kO2vF8HBymW3az g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">
              <img className="_vZPglRSyqi4oTXg5L1_ _pwSRUXRHN5bHphyTRKz _gmxfZ2BpOHxa6nWwqBB"
                src="final_logo.png" alt="logo" style={{ "width": "3rem", "height": "2rem" }} />
              Flow Education
            </a>
            <h1 className="rD4HtsUG_hahmbh2Kj09 _e063bssp_1bldcJ6kR0 _WfIfkoGCi0vvUrnNs4M jGqC6Vyq4r7i62RWVQU_ marR_sCaF_d1KewmkXGX g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">
              Create your Account
            </h1>
            <p className="MxG1ClE4KPrIvlL5_Q5x XdjN1uxS_rsa3F90ox40 K1PPCJwslha8GUIvV_Cr _Rz9TooiK_4jTN_Ub8Gm">
              Start your website in seconds. Already have an account? <a href="/login"
                className="_A6LflweZRUwrcL6M2Tk text-primary-600 _5zvlMLkN1qETxEl3IhT dark:text-primary-500">Login
                here</a>.
            </p>
            <form className="KgBTWt39fdiAC__YVNt8 xXHjLQ2J7cbu8iHm8NVp AuB0Ecr_8CO7ghWxxqa1" onSubmit={handleSubmit}>
            <div className="jCHKuJ3G7rklx_LiAfbf PwY_VWJs3K9KHLKi48qA">
                <label htmlFor="userType" className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0 bg-white">User Type</label>
                <select id="userType" name="userType" value={userType} onChange={handleChange} required
                  className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj">
                  {/* <option value="" disabled>Select user type</option> */}
                  <option  value="govt" selected>Goverment</option>
                  <option value="college">Unversity/college/School</option>
                </select>
              </div>
              {userType=="govt" ?<div>
              <div className="i0EfZzmTLElZVOble53D lSg6RHKCkPBz2kSnADor hAFtnIdYDiO6M_67F11P">
              <div>
                  <label htmlFor="name"
                    className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">Your
                    Name</label>
                  <input type="text" name="name" id="name"
                    className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
                    placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="email"
                    className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">Your
                    email</label>
                  <input type="email" name="email" id="email"
                    className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
                    placeholder="name@company.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="Goverment Department"
                    className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">Goverment Department</label>
                  <input type="text" name="GovtDepartment" id="name"
                    className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
                    placeholder="Your Name" value={formData.GovtDepartment} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="helpline"
                    className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">Contact</label>
                  <input type="text" name="helpline" id="helpline"
                    className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
                    placeholder="Contact" value={formData.helpline} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="password"
                    className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">Password</label>
                  <input type="password" name="password" id="password"
                    className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
                    placeholder="Password" value={formData.password} onChange={handleChange} required />
                </div>
              </div>
</div>:<div>   <div>
            <label htmlFor="collegeId"
              className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">College ID</label>
            <input type="text" name="collegeId" id="collegeId"
                  className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
              placeholder="Enter College ID" value={collegeData.collegeId} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="name"
              className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">College/School Name</label>
            <input type="text" name="name" id="name"
                 className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
              placeholder="Enter College/School Name" value={collegeData?.name} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="department"
              className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">Department</label>
            <input type="text" name="department" id="department"
                 className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
              placeholder="Enter Department" value={collegeData.department} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="email"
              className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">Email</label>
            <input type="email" name="email" id="email"
                className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
              placeholder="name@college.com" value={collegeData.email} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="password"
              className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">Password</label>
            <input type="password" name="password" id="password"
                 className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
              placeholder="••••••••" value={collegeData.password} onChange={handleChange} required />
          </div>

          <div>
            <label htmlFor="collegeType"
              className="ttxtqsLWp2pFRX8yUvWd rD4HtsUG_hahmbh2Kj09 MxG1ClE4KPrIvlL5_Q5x _A6LflweZRUwrcL6M2Tk g3OYBOqwXUEW4dRGogkH a0Ed69aMSu0vgf4oysz0">College Type</label>
            <input type="text" name="collegeType" id="collegeType"
                 className="jCHKuJ3G7rklx_LiAfbf PWreZZgitgAm_Nv4Noh9 T_tFENbpK8DMDNjQRyQa g3OYBOqwXUEW4dRGogkH MxG1ClE4KPrIvlL5_Q5x _Qk4_E9_iLqcHsRZZ4ge focus:ring-primary-600 focus:border-primary-600 ttxtqsLWp2pFRX8yUvWd jCISvWkW5oStPH6Wrb_H _4wtDMQ2AdJOlYvml5sL _t2wg7hRcyKsNN8CSSeU _BIVSYBXQUqEf_ltPrSk _DJ2tfp6E9c_teMKVD3z a0Ed69aMSu0vgf4oysz0 OOJuY9kV1XZH_KV1ElVw FXh9uSTLEhQn4Ek_3flj"
              placeholder="Public/Private" value={collegeData.collegeType} onChange={handleChange} required />
          </div>
        </div>}
              
        <button type="submit"
                    class="jCISvWkW5oStPH6Wrb_H wP9HMsqy6b96l2HBRbgb bg-primary-600 hover:bg-primary-700 _FONMPVaCsLFJJGDaaIL qHIOIw8TObHgD3VvKa5x focus:ring-primary-300 _A6LflweZRUwrcL6M2Tk _Qk4_E9_iLqcHsRZZ4ge MxG1ClE4KPrIvlL5_Q5x bFARDnno0HUtfhktTXfR _gKcj49wZgnwx1LpcJi6 _F_1gdhzusC6tSOWHtx_ dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up
                </button>

              
            </form>
          </div>
        </div>
      </section>
      <div className="footer"><Footer/></div>
    </>
  );
};

export default Register;
