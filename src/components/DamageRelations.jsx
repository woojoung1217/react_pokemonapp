/* eslint-disable */
import React, { useEffect, useState } from "react";
import Type from "./Type";

const DamageRelations = ({ damages }) => {
  // 랜더시 props 로 받은 데이터를 각 요소를 매핑 하며 함수 실행

  const [damagePokemonForm, setDamagePokemonForm] = useState([]);
  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToAndFrom(damage)
    );

    if (arrayDamage.length === 2) {
      const obj = joinDamageRelations(arrayDamage);
      setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)));
    } else {
      setDamagePokemonForm(postDamageValue(arrayDamage[0].from));
    }
  }, []);

  const reduceDuplicateValues = (props) => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };

    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;
      console.log([keyName, value]);
      const verifiedValue = fliterForUniqueValues(value, duplicateValues[key]);

      return (acc = { [keyName]: verifiedValue, ...acc });
    }, {});
  };

  const fliterForUniqueValues = (valueForFlitering, damageValue) => {
    // valueForFlitering이 배열이 아닌 경우 배열로 변환
    const valueArray = Array.isArray(valueForFlitering)
      ? valueForFlitering
      : Object.values(valueForFlitering);

    return valueArray.reduce((acc, currentValue) => {
      const { url, name } = currentValue;
      console.log(url, name);

      // 배열로 받아온 경우에는 바로 사용, 객체로 받아온 경우에는 Object.values로 배열로 변환
      const accArray = Array.isArray(acc) ? acc : Object.values(acc);

      const filteredAcc = accArray.filter((a) => a.name !== name);

      return filteredAcc.length === accArray.length
        ? (acc = [currentValue, ...accArray])
        : (acc = [{ damageValue: damageValue, name, url }, ...filteredAcc]);
    }, []);
  };

  const joinDamageRelations = (props) => {
    return {
      to: joinObjects(props, "to"),
      from: joinObjects(props, "from"),
    };
  };

  const joinObjects = (props, string) => {
    const key = string;
    const firstArrayValue = props[0][key];
    const secondArrayValue = props[1][key];
    const result = Object.entries(secondArrayValue).reduce(
      (acc, [keyName, value]) => {
        const result = firstArrayValue[keyName].concat(value);
        return (acc = { [keyName]: result, acc });
      },
      {}
    );
    return result;
  };

  /** 데미지 벨류 포맷 해주는 함수 */
  const postDamageValue = (props) => {
    const result = Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const valuesOfKeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };

      // value가 배열인지 확인한 후에 map 호출
      const mappedValue = Array.isArray(value)
        ? value.map((i) => ({
            damageValue: valuesOfKeyName[key],
            ...i,
          }))
        : value;

      return (acc = {
        [keyName]: mappedValue,
        ...acc,
      });
    }, {});

    return result;
  };

  /**  데미지 내용에서 damage 이름이 _from _to 를 받아와 콜백  */
  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations("_from", damage);

    const to = filterDamageRelations("_to", damage);

    return { from, to };
  };

  /** from , to 로 받아온 내용을 배열로 바꿔준뒤 내용 변경 */
  const filterDamageRelations = (valueFilter, damage) => {
    const result = Object.entries(damage)
      .filter(([keyName, value]) => {
        return keyName.includes(valueFilter);
      })
      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterName = keyName.replace(valueFilter, "");

        return (acc = { [keyWithValueFilterName]: value, ...acc });
      }, {});
    return result;
  };

  // ...

  return (
    <div className="flex gap-2 flex-col">
      {damagePokemonForm ? (
        <>
          {Object.entries(damagePokemonForm).map(([keyName, value]) => {
            const key = keyName;
            const valuesOfKeyName = {
              double_damage: "Weak",
              half_damage: "Resistant",
              no_damage: "Immune",
            };

            return (
              <div key={key}>
                <h3 className="capitalize font-medium text-sm md:text-base text-slate-500 text-center">
                  {valuesOfKeyName[key]}
                </h3>

                <div className="flex flex-wrap gap-1 justify-center">
                  {value.length > 0 ? (
                    value.map(({ name, url, damageValue }) => (
                      <Type
                        type={name}
                        key={url}
                        damageValue={damageValue}
                      ></Type>
                    ))
                  ) : (
                    <Type type={"none"} key={"none"}></Type>
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );

  // ...
};

export default DamageRelations;
