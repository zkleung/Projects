
# Raylen Liang
# 12/02
# Conway's Game of Life
import os
def countNeighbors(grid,x,y):
    counter = 0
    try:
        if grid[x-1][y+1] == 1:
            counter += 1
        if grid[x-1][y] == 1:
            counter += 1
        if grid[x-1][y-1] == 1:
            counter += 1
        if grid[x][y+1] == 1:
            counter += 1
        if grid[x][y-1] == 1:
            counter += 1
        if grid[x+1][y+1] == 1:
            counter += 1
        if grid[x+1][y] == 1:
            counter += 1
        if grid[x+1][y-1] == 1:
            counter += 1
    except:
        counter += 0
    
    if counter  <= 1:
        return 0
    elif counter > 3:
        return 0
    elif counter == 3:
        return 1
    else:
        return (grid[x][y])



def nextGen(grid):
    lenRow = len(grid[0])
    numRow = len(grid)
    newlist = []
    for i in range(lenRow-1):
        subList = []
        for j in range(numRow+1):
            subList.append(countNeighbors(grid,i,j))
        newlist.append(subList)
    return newlist

def newGrid(grid):
    for i in range(len(grid)):
        for j in range(len(grid[0])):
           if (grid[i][j]) == 1:
               print("*", end= " ")
           else:
               print(".", end= " ")
        print("\n", end= "")
    print("\n", end= "")



def checkFile():
    while True:
        try:
            fileName = input("Enter input file name: ")
            openFile = open(fileName, 'r')
            break
        except:
            print("No such file. Try again.")

    while True:
        try:
            numGen = int(input("How many new generations would you like to print?"))
            break
        except:
            print("Not a valid number.")
    return [openFile , numGen]

def save(newTable):
    while True:
        save = input("Would you like to save the latest generation? ('y' to save): ")
        if save == "y":
            while True:
                fileName = input("Enter destination file name: ")
                if (os.path.exists(fileName)):
                    rewrite = input("Do you want to overwrite that file? ('y' to continue): ")
                    if rewrite != "y":
                        continue
                writeFile = open(fileName, "w")
                print("\nSaving data to %s"%fileName)
                break
            if writeFile != None:
                for i in range (len(newTable)):
                    for j in range(len(newTable[0])):
                        writeFile.write("%d"%newTable[i][j])
                    writeFile.write("\n")
                writeFile.close()    
                break
        else:
            break

def life():
    glider = []
    
    chkFileVals = checkFile()
    
    numGen = chkFileVals[1]
    
    openFile = chkFileVals[0]


    
    for dataList in openFile:
        newList = []
        dataList = dataList.strip()
        for i in dataList: 
            newList.append(int(i))
        glider.append(newList)
        
    openFile.close()



    for gen in range(numGen):
        
        print("Generation: %d"%gen)
        newGrid(glider)
        glider = nextGen(glider)
    print("Generation: %d"%numGen)
    newGrid(glider)



    openFile = None

    
    save(glider)

    

    print("\nEnd of program")

    
