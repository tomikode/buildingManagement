import Head from 'next/head'
import formStyles from '../styles/Form.module.css'

export default function Home() {
  return (
    <>
    
    <div>
      <Head>
        <title>Damage Reporting</title>
      </Head>
      <h1>Damage Reporting Form</h1>
    </div>
    
    <div class={formStyles.container}>
        <form>
              <div class={formStyles.row}>
                   <div class={formStyles.col-25}>
                   <label>Description of Inciddent</label>
                   </div>
                   <div class={formStyles.col-75}>
                   <input type='text' class={formStyles.a} placeholder='Write something..'/>
                   </div>
              </div>
  
              <div class={formStyles.row}>
                    <div class={formStyles.col-25}>
                    <label>Submitted by</label>
                    </div>
                    <div class={formStyles.col-75}>
                    <input type='text' class={formStyles.b} placeholder='Your name..'/>
                    </div>
              </div>

              <br/>
              <div>
                    <label>Tick the box to notify building manager</label>
                    <input type='checkbox' />
               </div>
              <br/>
              <div class={formStyles.row}>
                    <input type='submit' value='Submit your application' class={formStyles.btn}/>
               </div>
          </form>
      </div>
    </>
 )
}
