module.exports = {
    success:1,
    error:0,
    mySqrt:function(x){
        let left = 0;
        let right = x;
        let ans = -1
        while (left <= right){
            let mid = left + ((right - left)>>1)
            if (mid * mid <= x){
                ans = mid
                left = mid + 1
            }else{
                right = mid-1
            }
        }
        return ans
    }
}