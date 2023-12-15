export const isListDataChanged = (listData: any[]): boolean => {
  for (const data of listData) {
    if (isDataChanged(data))
    {
      return true;
    }
  }

  return false
}

export const isDataChanged = (data: any): boolean => {
    for (const key in data) {
      if (data[key]?.isEdited) {
        return true
      }
  }

  return false
}

export const isListDataChangedSkipOriginalData = (listData: any[], originalListData: any[]): boolean => {
  if (listData.length !== originalListData.length) {
    return true; 
  }

  for (let i = 0; i < listData.length; i++) {
    const data = listData[i];
    const originalData = originalListData[i];

    if (isDataChanged(data) !== isDataChanged(originalData))
    {
      return true;
    }
  }

  return false;
}
