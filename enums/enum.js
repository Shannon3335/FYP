//Enum factory function that creates a read only constant that can be used throughout the project
//Created using code from https://dmitripavlutin.com/javascript-enum/
//Call this function in other files to create a proxied enum

/*
A proxy is exactly what it says it is, a proxy on an object. I create 
logic that intercepts someone trying to get or set the value of a the
variable that I create a Proxy for.
*/
const Enum = (baseEnum) => {
  return new Proxy(baseEnum, {
    get(target, prop) {
      if (!(prop in target)) {
        throw new Error(`"${prop}" value does not exist in the enum`)
      }
      return target[prop]
    },
    set() {
      throw new Error('Cannot add a new value to an enum')
    },
  })
}

export default Enum
