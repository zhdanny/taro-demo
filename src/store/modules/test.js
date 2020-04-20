import { observable, action } from 'mobx'

class TestStore {
  @observable data = '1314'

  @action.bound
  async test() {
    await setTimeout(()=>{
      console.log('1212')
    },200)
  }
}

export default new TestStore()
