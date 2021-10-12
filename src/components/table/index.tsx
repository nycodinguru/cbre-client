import { useEffect } from "react"

import "./styles.scss"
import type { Customer } from "types/customer"

export interface TableProps {
  data: any
  headers: string[]
  onClickRow: (args0?: any) => void
}

export const Table: React.FC<TableProps> = ({ data, headers, onClickRow }) => {
  let keyCount = 0

  const getKey = (prefix: string) => {
    keyCount = keyCount += 1
    return `${prefix}-${keyCount}`
  }

  const renderTable = () => {
    return (
      <>
        <tr key={getKey("headers")} className="table__headers">
          {headers.map((header) => {
            return (
              <td key={header} className="table__header">
                <div>{header}</div>
              </td>
            )
          })}
        </tr>
        {data.map((row: Customer) => {
          return (
            <tr
              key={getKey("rows")}
              className="table__row"
              onClick={() => onClickRow(row.id)}>
              {Object.values(row).map((data: any) => {
                return (
                  <td key={getKey("td")} className="table__data">
                    {data}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </>
    )
  }

  const NoData = () => {
    return (
      <tr className="table__row--no-data">
        <td>No Data</td>
      </tr>
    )
  }

  return (
    <div className="table__container">
      <table className="table">
        <tbody className="table__body">
          {data ? renderTable() : <NoData />}
        </tbody>
      </table>
    </div>
  )
}
