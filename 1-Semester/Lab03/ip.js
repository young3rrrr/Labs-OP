function ipToInt(ip) {
    ip = ip.split('.');
    return ((ip[0] << 8*3) | (ip[1] << 8*2) | (ip[2] << 8) | ip[3]) >>> 0;
}
console.log(ipToInt('10.0.0.1'));