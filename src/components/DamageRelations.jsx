/* eslint-disable */
import React, { useEffect } from "react";

const DamageRelations = ({ damages }) => {
  // 랜더시 props 로 받은 데이터를 각 요소를 매핑 하며 함수 실행
  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToAndFrom(damage)
    );

    if (arrayDamage.length === 2) {
      const obj = joinDamageRelations(arrayDamage);
      postDamageValue(obj.from);
    } else {
      // type 한개일 때
      postDamageValue(arrayDamage[0].from);
    }
  }, []);

  const reduceDuplicateValues = (props) => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };

    Object.entries(props);
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

      return (acc = {
        [keyName]: value.map((i) => ({
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
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

  return <div>DamageRelations</div>;
};

export default DamageRelations;
