const numObject = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

const getNepaliNumber = (num) => {
  let nepaliNum = "";
  for (let i = 0; i < num.length; i++) {
    if (/^-?\d+$/.test(num[i])) {
      nepaliNum += numObject[num[i]];
    } else {
      nepaliNum += num[i];
    }
  }
  return nepaliNum;
};

export { getNepaliNumber };
