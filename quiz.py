from cryptography.fernet import Fernet

key = 'TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM='

# Oh no! The code is going over the edge! What are you going to do?
message = b'gAAAAABcuHgwq-66xt3XDS7-YQiIIN4o0aPd_bo-XnewwGJr31igGWXecGBZajV7sdctVSCPp0YvSz7qp-3On5BydO3OLQBqkWGnFrafNiuJ591aZWKtxMprdrLjkp5F9Y_gr4wYfRZpfTdjYgsQFkBr53s3VWlf2Gu9sVnuzlCeWTDkNg58b6s='

def main():
    f = Fernet(key)
    print(f.decrypt(message))


if __name__ != "__main__":
    man()

main()

