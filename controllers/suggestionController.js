import Storage from '../models/Storage';

const storage = new Storage();

export const  getSuggestions = async(req,res) =>{
    console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    const searchReq = req.params.q;
    const latitude = req.params.latitude;
    const longitude = req.params.longitude;
    // console.log(`searchReq : ${searchReq}`);
    // console.log(`latitude : ${latitude}`);
    // console.log(`longitude : ${longitude}`);
    const alikeCities = await storage.getCity(searchReq,latitude,longitude);
    console.log(`cities from the controller:${alikeCities} `);

    // console.log(`stored cities : ${storage.cities}`);
    res.status(200).json({
        suggestions : alikeCities
    });
    // res.status(400).json({
    //     status: res.statusCode,
    //     // error: error,
    // });
}