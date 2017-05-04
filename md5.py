import hashlib
import sys

def md5(file):
    f = open(file, 'rb')
    s = f.read()
    f.close()
    m = hashlib.md5()
    m.update(s)
    return m.hexdigest()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("USAGE:\nmd5 example.txt")
    else:
        print md5(sys.argv[1])
