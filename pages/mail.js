import formStyles from '../styles/Form.module.css'
import Layout from '../components/Layout'

export default function mail() {
  return (

    
  <Layout pageType="t">
    
    <div>
      <h1>Compose email</h1>
    </div>
        <div>
             <div className={formStyles.container}>
                 
                 <div>
                    <input type="email" name="email" className={formStyles.b} placeholder="email address"/>
                 </div>
                 <br/>
                 <div>
                    <input type="text" name="name" className={formStyles.b} placeholder='subject'/>
                 </div>
                 <br/>
                 <div>
                    <textarea name="massage" className={formStyles.a} placeholder="enter your massage"/>
                 </div>
                 <div>
                 <input type='submit' value='Send' className={formStyles.btn}/>
                 </div>
            
             </div>
      
        </div>
      </Layout>
    );
}


