// import React from 'react'

const DBOrderForm = () => {
  return (
    <form>
        <table>
            <thead>
                <tr>
                    <th>
                        S.No
                    </th>
                    <th>
                        Category
                    </th>
                    <th>
                        Product Code
                    </th>
                    <th>
                        Product Description
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        UOM
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" /></td>
                    <td><input type="text" /></td>
                    
                </tr>
            </tbody>
        </table>
    </form>
  )
}

export default DBOrderForm