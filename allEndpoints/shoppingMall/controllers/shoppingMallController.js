import * as  fs from "fs";
import * as  uuid from "uuid";
export async function queryAllMall() {
  try {
    const fileData = fs.readFileSync("./data/mall.json");
    const useFileData = fileData || [];
    return JSON.parse(useFileData.toString());
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

export async function saveMall(req, res) {
  try {
    const rows = await queryAllMall();
    const id = uuid.v4();
    const products = req.body||[];
    const productsPrices = products.map((item)=>item.price||0);
    const mallData = [{
      mallName:"ALBERT HEIJN",
      mallProducts: req.body,
      mallAllPrice: (productsPrices.reduce((total,item)=>(total + item),0) * 1.2).toFixed(2) - 0
    },{
      mallName:"JUMBO",
      mallProducts: req.body,
      mallAllPrice: (productsPrices.reduce((total,item)=>(total + item),0) * 1.5).toFixed(2) - 0
    },{
      mallName:"LOCAL SHOP",
      mallProducts: req.body,
      mallAllPrice: (productsPrices.reduce((total,item)=>(total + item),0) * 0.9).toFixed(2) - 0
    }]
    const newData = [...rows, { id,mallData }];
    fs.writeFileSync("./data/mall.json",JSON.stringify(newData));
    res.json({code:0,message:'Success!',data:id});
  } catch (error) {
    console.log(error.message);
    res.status(500);
    res.json({
      title: "no stores found",
      message: `🥴 We did something wrong`,
    });
  }
}

export async function getMall(req, res) {
  const rows = await queryAllMall();
  if (rows.length > 0) {
    let useData = rows.filter((item)=>item.id === req.query.id);
    res.json(useData);
  } else {
    res.status(500);
    res.json({
      title: "no stores found",
      message: `🥴 We did something wrong`,
    });
  }
}

queryAllMall();
