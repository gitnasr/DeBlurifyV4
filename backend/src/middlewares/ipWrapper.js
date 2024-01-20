const { IPinfoWrapper, LruCache } = require("node-ipinfo");
const VARS = require("../config/env");
const cacheOptions = {
    max: 5000,
    maxAge: 24 * 1000 * 60 * 60,
};
const cache = new LruCache(cacheOptions);
const ipinfo = new IPinfoWrapper(VARS.IPINFO, cache);
const CountryFromIp = async (ip) => {
    const details = await ipinfo.lookupIp(ip);
    return details.country;
}
module.exports = CountryFromIp;
