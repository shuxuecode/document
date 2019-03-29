package main  
      
import (  
	// "fmt"  
	"io"  
	"net/http"  
	"os"  
)  
	
var (  
	url = "https://www.baidu.com/img/baidu_jgylogo3.gif"  
)  
	
func main() {  
	res, err := http.Get(url)  
	if err != nil {  
		panic(err)  
	}  
	f, err := os.Create("logo.gif")  
	if err != nil {  
		panic(err)  
	}  
	io.Copy(f, res.Body)  
}  