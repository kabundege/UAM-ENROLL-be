const isStringNumber = (value: string) => isNaN(Number(value)) === false;
/**
 * 
 * @param givenEnum 
 * @returns {String}[]
 * * removes index (numbers)
 */
export const enumToArray = <T extends {}>(givenEnum: T)  => {
  return (Object.keys(givenEnum).filter(isStringNumber) as (keyof T)[]).map(
    (key) => givenEnum[key]
  );
}