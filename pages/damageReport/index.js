import formStyles from '../../styles/Form.module.css'
import Layout from '../../components/Layout'

export default function DamageReport() {
  return (
    <Layout pageType="t">
    
    <div>
      <h1>Damage Reporting Form</h1>
    </div>
    
    <div className={formStyles.container}>
        <form>
              <div className={formStyles.row}>
                   <div className={formStyles.col25}>
                   <label>Description of Inciddent</label>
                   </div>
                   <div className={formStyles.col75}>
                   <input type='text' className={formStyles.a} placeholder='Write something..'/>
                   </div>
              </div>
  
              <div className={formStyles.row}>
                    <div className={formStyles.col25}>
                    <label>Submitted by</label>
                    </div>
                    <div className={formStyles.col75}>
                    <input type='text' className={formStyles.b} placeholder='Your name..'/>
                    </div>
              </div>

              <br/>
              <div>
                    <label>Tick the box to notify building manager</label>
                    <input type='checkbox' />
               </div>
              <br/>
              <div className={formStyles.row}>
                    <input type='submit' value='Submit your application' className={formStyles.btn}/>
               </div>
          </form>
      </div>
    </Layout>
 )
}
