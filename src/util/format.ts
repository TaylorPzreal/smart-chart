import { XConfiguration, XDataSerial, XDataTuple, XData } from '../type';

type ResponseData = [XData, string]

function dataToLine(configuration: XConfiguration): XDataSerial[] {
  const { serials } = configuration;
  return serials;
}

function dataToBar(configuration: XConfiguration):XDataSerial[] {
  const { serials } = configuration;
  return serials;
}

function dataToHorizontalBar(configuration: XConfiguration):XDataSerial[] {
  const { serials } = configuration;
  const result: XDataSerial[] = [];
  serials.forEach(s => {
    result.push({
      name: s.name,
      data: s.data.map(d => ([d[1], d[0]])),
    });
  });

  return result;
}

function dataToPie(configuration: XConfiguration): ResponseData {
  const { serials } = configuration;
  let data: XData = [];

  data = serials[0].data.map((v: XDataTuple) => ({
    name: v[0],
    value: v[1],
  })) as XData;

  return [data, serials[0].name];
}

export {
  dataToLine,
  dataToPie,
  dataToBar,
  dataToHorizontalBar,
}
