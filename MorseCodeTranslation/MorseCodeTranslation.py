
# Raylen Liang
# 11/9/2016

# hashmap for translation
morseCodeList = [["a",".-"],["b","-..."],["c","-.-."],["d","-.."],
                 ["e","."],["f","..-."],["g","--."],["h","...."],
                 ["i",".."],["j",".---"],["k","-.-"],["l",".-.."],
                 ["m","--"],["n","-."],["o","---"],["p",".--."],
                 ["q","--.-"],["r",".-."],["s","..."],["t","-"],
                 ["u","..-"],["v","...-"],["w",".--"],["x","-..-"],
                 ["y","-.--"],["z","--.."]]
##the while loop to make it continue until *** is typed to end
def morseCode():
    while True:
        sentence = input("Enter a sentence to be translated (*** to end): ")
        if sentence != "***":
            encodedSentence = ""
            ##actual translating
            for character in sentence:
                if character != " ":
                    try:
                        encodedSentence = encodedSentence + morseCodeList[findMorseCode(character)][1] + " "
                    except:
                        encodedSentence = encodedSentence + "###"
                elif character == " ":
                    encodedSentence = encodedSentence + "   "

            print("Morse code: " , encodedSentence)
        ## breaking loop when *** is entered
        elif sentence == "***":
            print("Program has ended")
            break
            

def findMorseCode(x):
    ## returns the number according to the location in the alphabet
    ## ex. a == 1 and z == 25
    for i1, innerList in enumerate(morseCodeList):
        for i2, character in enumerate(innerList):
            if character == x:
                return i1

